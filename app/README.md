# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.15.3 create --template minimal --types ts --add prettier tailwindcss="plugins:typography,forms" --install npm app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Image Uploads On Vercel

Vercel serverless deployments do not keep files written to `static/uploads`, so production image
uploads should use Cloudinary. The app automatically uploads product and review images to Cloudinary
when either `CLOUDINARY_URL` exists:

```sh
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
CLOUDINARY_FOLDER=abayiza
```

Or when these separate environment variables exist:

```sh
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=abayiza
```

Add the same variables in Vercel Project Settings -> Environment Variables, then redeploy.
Local development can keep using `static/uploads` if the Cloudinary variables are missing.
