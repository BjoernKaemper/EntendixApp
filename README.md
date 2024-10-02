# essentials

## Project setup

1. Install packages `yarn install` or `npm install`.
2. If needed edit the env-vars in the `.env`-file.
3. Pull the types-repository `git submodule update --init --recursive`.

## Run in Dev-mode
You will need to run the middleware as well. The middleware is located in an additional repository. You can find it [here](https://github.com/PLYTEQ/entendix-web-middleware). If this is setup correctly and is running, you can run the project with `yarn dev` or `npm run dev`.

If there are any changes within the types you need to pull those changes via `git submodule update --recursive --remote`.

## Compile for production
For production run the project with `yarn build` or `npm run build`.

## Linting
For linting run the project with `yarn lint` or `npm run lint`.

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
