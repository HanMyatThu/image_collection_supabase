This is a technical test , from miyagami for a medior full stack developer position.

## Tech Stack

**Tech stacks:**  Next Js, @supabase-ssr, shadcn, tailwind css, react-hook-form , zod, date-fns , query-string, supabase


## Getting Started

First, clone my github repository. Then install the dependencies and run the development server

```bash
git clone link
cd ./folder
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment Link

This app is deployed to vercel. Please check this [https://miyagami-project.vercel.app/](https://miyagami-project.vercel.app/)

## Database Flow with Supabase

Firstly, there are three tables, created in supabase

![image](https://github.com/user-attachments/assets/911cd835-17e6-4018-820b-d746bdd2334a)

Image table has these fields where user_id field is a foreign key , with id field from auth user table

```
 interface Image = {
    id: string,
    user_id: id,
    title: string,
    description: string
    is_public: boolean;
    created_at: Date,
    updated_at: Date,
  }  
```

Favorite Table has these fields where user_id and image_id are composite primary key. (I removed adding id field here)

```
  interface Favorite {
    user_id: id;
    image_id: id,
    created_at: Date,
  }
```

There is a storage bucket called images to store images in supabase.

![image](https://github.com/user-attachments/assets/32c8158f-2113-4b21-b0a2-8d10ff7eb80f)

### Demo

you can use these two accounts for the application

 - test acc 1
email: draz.coding@gmail.com
password: Sorshilar123!@#

- test acc 2
email: redondo.creator@gmail.com
password: Sorshilar123!@#

I provide test accounts because supabase restricted user flows. You cannot register with email unless you are invited from the organization.

1. Home Page

If you don't login you will see this information for the home page, here the logic is you can only see the images uploaded by every users , where the image's publicity is set to true.
You cannot see the private images here.

![image](https://github.com/user-attachments/assets/4f00e4e9-50a1-4212-b8b3-ee4d97b9cfc7)

Once you login with a testing account, you will see more information like this. Here the logic is you can see images.is_public === true that are updated by every other users and both private and public images 
updated by yourself.

![image](https://github.com/user-attachments/assets/d1bfef81-4067-4f5d-94d8-58e93a94f418)

You can see the different information between sidebar information and home page information.

2. Favourite Page

you can simply like and dislike the image by clicking on heart icon. You will see the changes in real time.

![image](https://github.com/user-attachments/assets/8b29535b-56c2-4ede-9f87-078d8872402b)


3. Search Page

you can search an image by image title, I use query approach instead of using state variable.

![image](https://github.com/user-attachments/assets/4019431e-abdf-4bd8-95af-05adac32ad5a)

4. Image manage page

You can update your own image in this page. just by clicking the row in the table.You can also download it or get the public url.

![image](https://github.com/user-attachments/assets/b7ed31d7-9707-4a53-be1e-78452cbf470f)

5. Image Upload Modal

If you want to upload an image, you can click the plus icon on the sidebar.

![image](https://github.com/user-attachments/assets/43a2d79e-92ff-4045-aac6-656948ecc02f)

6. Different Information

Here when you login with test account 2, you can see the information is differnt based on the permission and validation of the image and user

![image](https://github.com/user-attachments/assets/4d1cb6b4-2559-42cf-8ebd-560a33e31f29)


## Additional 

I tried to use mostly server side components and server actions. At first I wanted to use @supabase/helper-react library, but I found out that it is deprecated so I used @supabase/ssr. which is the updated one.
So, mostly you will see server components and actions. The user session is controlled in server, from supabase server session.

If you check the repository, you will see how I structure the folders , create the resuable components, separete inmports in each file, adding loading for UI/UX, controlling user information and use server components 
effectively.


P.S. Even though I checked carefully before deployment, the application might have some unnown bugs.

Let me know if you have any question or any concern. I am willing to receive any feedback.








