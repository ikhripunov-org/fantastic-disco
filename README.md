## How to

### test
```
npx tsc; npm run test:unit
```

Tests are reporting 100% coverage which is not the case as outlined in the comments in `src/__tests__/ConfigService.ts`.

### run

Assuming you have valid AWS session and updated configuration in `ConfigService.ts` to point to the right AWS AppConfig in the right environment and region:
```
ApplicationIdentifier: "...",
ConfigurationProfileIdentifier: "...",
EnvironmentIdentifier: "..."
```
In the hindsight it could've been an env file, but that's out of scope.

And then:
```
npx tsc; npm run dev
```
starts a server on http://localhost:3000/config
