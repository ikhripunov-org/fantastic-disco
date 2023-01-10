import { IConfigService } from "../utils/server"
import { AppConfigDataClient, StartConfigurationSessionCommand, GetLatestConfigurationCommand } from "@aws-sdk/client-appconfigdata"
import { toUtf8 } from "@aws-sdk/util-utf8-node"
import fs from 'fs';

export class ConfigService implements IConfigService {
    
    async getConfig(): Promise<any> {
        const client = new AppConfigDataClient({ region: "us-east-1" });
        try {
            const tokenResponse = await client.send(
                new StartConfigurationSessionCommand({
                    ApplicationIdentifier: "v8t9h6l ",
                    ConfigurationProfileIdentifier: "vi24o0h ",
                    EnvironmentIdentifier: "tv7tlr2 "
                })
            )
            
            const configResponse = await client.send(
                new GetLatestConfigurationCommand({
                    ConfigurationToken: tokenResponse.InitialConfigurationToken
                })
            )
            return JSON.parse(toUtf8(configResponse.Configuration!))
        } catch (error) {
            return this.getBackupConfig()
        }
    }

    private getBackupConfig(): any {
        const result = fs.readFileSync('backupConfig.json', 'utf-8');
        return JSON.parse(result);
    }
}