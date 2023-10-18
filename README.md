# YelpCamp - Campground Finder

YelpCamp is a campground-finding website that allows users to discover and share information about campgrounds. Whether you're an experienced camper or a first-time explorer, YelpCamp provides a platform for campers to create and review campgrounds, making it easier to plan your next outdoor adventure.

## Features

- **User Registration and Authentication**: Users can sign up, log in, and securely manage their accounts using Passport.js for authentication.

- **Campground Management**: Registered users can add new campgrounds, including details such as name, description, location, and images. They can also edit and delete campgrounds they've added.

- **Campground Reviews**: Users can leave reviews for campgrounds, giving feedback and ratings. These reviews help others make informed decisions.

- **Responsive Design**: YelpCamp is built with a responsive design, ensuring a great user experience on various devices, including desktop and mobile.

- **Search and Filter**: Visitors and users can search for campgrounds by name or location and filter results based on various criteria, such as ratings.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- EJS (Embedded JavaScript) for templates
- Passport.js for user authentication
- Helmet.js for security
- Express Validator for data validation
- Cloudinary for image storage and management

## Installation and Setup

1. Clone the GitHub repository:

   ```shell
   git clone https://github.com/asheshmandal2003/YelpCamp.git
   ```

2. Navigate to the project directory:

   ```shell
   cd yelpcamp
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the project root directory and provide the necessary environment variables, including MongoDB connection URI, Cloudinary credentials, and your session secret.

5. Start the application:

   ```shell
   npm start
   ```

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access YelpCamp.

## Project Structure

- `app.js`: The main application file where the Express app is configured.
- `routes/`: Contains route files for campgrounds, reviews, user authentication, and user profiles.
- `models/`: Defines the MongoDB models for campgrounds, reviews, and users.
- `views/`: Contains the EJS templates for rendering the website's pages.
- `public/`: Includes static files like stylesheets and client-side scripts.
- `middleware/`: Custom middleware functions used in the application.
- `config/`: Configuration files, including Passport.js setup.
- `seed.js`: A script to seed the database with initial data (optional).
