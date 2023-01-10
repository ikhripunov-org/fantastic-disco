import { mockClient } from "aws-sdk-client-mock";
import { AppConfigDataClient, StartConfigurationSessionCommand, GetLatestConfigurationCommand } from "@aws-sdk/client-appconfigdata";
import { fromUtf8 } from "@aws-sdk/util-utf8-node";
import { ConfigService } from "../services/ConfigService";

const acdcMock = mockClient(AppConfigDataClient)

beforeEach(() => {
    acdcMock.reset()
})

const config = {
    configKey: "configValue"
}


describe('getConfig', () => {
    it('should return config from AWS', async () => {
        acdcMock.on(StartConfigurationSessionCommand).resolves({
            InitialConfigurationToken: 'fizz buzz'
        })

        acdcMock.on(GetLatestConfigurationCommand).resolves({
            Configuration: fromUtf8(JSON.stringify(config))
        })

        const svc = new ConfigService()

        const result = await svc.getConfig()
        expect(result).toEqual(config)
    }),

    it('should fall back to file system if GetLatestConfigurationCommand returns undefined', async () => {
        acdcMock.on(StartConfigurationSessionCommand).resolves({
            InitialConfigurationToken: 'fizz buzz'
        })

        acdcMock.on(GetLatestConfigurationCommand).resolves({
            Configuration: undefined
        })

        const svc = new ConfigService()

        const result = await svc.getConfig()
        //TODO I've failed mocking fs with Jest because it jets in a way of some AWS SDK internals.
        // A way to resolve that would be extracting that to a separate module and mocking it
        expect(result).toEqual(JSON.parse('{"backupConfigKey": "backupConfigValue"}'))
    })

    it('should fall back to file system if GetLatestConfigurationCommand fails', async () => {
        acdcMock.on(StartConfigurationSessionCommand).resolves({
            InitialConfigurationToken: 'fizz buzz'
        })

        acdcMock.on(GetLatestConfigurationCommand).rejects()

        const svc = new ConfigService()

        const result = await svc.getConfig()
        //TODO I've failed mocking fs with Jest because it jets in a way of some AWS SDK internals.
        // A way to resolve that would be extracting that to a separate module and mocking it
        expect(result).toEqual(JSON.parse('{"backupConfigKey": "backupConfigValue"}'))
    })

    it('should fall back to file system if StartConfigurationSessionCommand fails', async () => {
        acdcMock.on(StartConfigurationSessionCommand).rejects()

        const svc = new ConfigService()

        const result = await svc.getConfig()
        expect(result).toEqual(JSON.parse('{"backupConfigKey": "backupConfigValue"}'))
    })

    // Should have a test for what heppens when the filesystem has an error/returns unparsable JSON
  }
)