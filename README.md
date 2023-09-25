https://github.com/raihan-ramadhan/notion-clone/assets/116264857/2fd4296a-09fc-4747-ab9d-f39ed273809e


## About Notion Clone

Project based on [www.notion.so](https://www.notion.so/) with exactly same interface and main functionality

Features:

- Same UI with notion.so by utilize TailwindCSS and ShadcnUI
- Full responsivity and mobile UI
- Intercepting Routes modal next.js (sign-in&sign-up)
- Global title and icon current document on metadata, sidebar, header and main page
- Editor and suggestion using command tiptap
- Authentication and custom component with Clerk
- Client fetch with @tanstack/react-query
- Create update, and delete a document
- Share a document
- Forbidden.tsx when try open others user editor
- Image upload, update, and delete using Cloudinary CDN (signed&invalidate)
- ORM using Prisma and prisma-json-types-generator
- Light / Dark mode (depend on system)

## Getting Started

### Prerequisites

Node version 18.x.x

### Installation

1. Clone the repository
   ```shell
   git clone https://github.com/raihan-ramadhan/notion-clone.git
   ```
1. Install dependencies
   ```shell
   npm install --force
   ```
   > It must install with flag --force because i used prisma-json-types-generator

### Setup
1. Setup cloudinary

   Watch this [Tutorial](https://github.com/raihan-ramadhan/notion-clone/assets/116264857/34a66d6d-9f9d-448b-bae0-5ab0e95c17be), the result will be as below
  ![preset cloudinary](https://github.com/raihan-ramadhan/notion-clone/assets/116264857/e4aa1525-4599-4c14-b89f-7793bf01f8aa)

   and copy-paste env cloudinary from dashboard to our .env
  ![dashboard cloudinary](https://github.com/raihan-ramadhan/notion-clone/assets/116264857/f54442ec-7ab8-425c-a047-76f4625951f4)
   

1. Setup clerk
   
   watch this [Tutorial](https://github.com/raihan-ramadhan/notion-clone/assets/116264857/5288ae00-13d1-40e9-9424-61595fbb98c5)

1. Setup .env file

   ```js
   DATABASE_URL=

   CLOUDINARY_API_SECRET=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   NEXT_PUBLIC_CLOUDINARY_API_KEY=

   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

   example :

   ```js
   DATABASE_URL =
     "mongodb+srv://your_username:your_password@notion-clone.zjhiiu.mongodb.net/myDatabase";

   CLOUDINARY_API_SECRET = "get_from_dashboard_cloudinary";
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "get_from_dashboard_cloudinary";
   NEXT_PUBLIC_CLOUDINARY_API_KEY = "get_from_dashboard_cloudinary";

   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in";
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up";
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/";
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/";
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="get_from_dashboard_api_clerk";
   CLERK_SECRET_KEY="get_from_dashboard_api_clerk";
   ```

1. Setup Prisma

   synchronize your Prisma schema with your database schema (i used mongoDB in this project)

   ```shell
   npx prisma generate
   npx prisma db push
   ```

   > when run these lines maybe you will get something like this `✘ Type DocumentWhereInput.editorJson is not supported.` it is caused by prisma-json-types-generator, but everything is still fine

### Start the app

```shell
npm run dev
```

---

email me if you have question 👋
