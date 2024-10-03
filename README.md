# Lesbotoč Dashboard

## Project Overview

The Lesbotoč Dashboard is a project which was a CMS for the Lesbotoc organizers. With the help of it, they did not have to propagate the database themselves, but had something usable to help them handle their the information on their website. It was hosted on a lesbotoc.cz subdomain and since the organization is undergoing re-structuring and rebranding (and it contains sensitive data), it is available with mock data at: 

[Admin Dashboard](https://dashboard.queuing4oranges.com/)

## Tech Stack

- JavaScript (React)
- SASS
- React-Router
- Axios
- Bootstrap
- Bootstrap Icons
- Sweet Alert
- React Toastify
- React CSV
- Figma (Wireframes)

## Functionalities for users

- CRUD operations on contacts, download contacts as csv for excel
- CRUD operations on events, events archive (added events are propagated to the user's website)
- Add and delete images that are used for Lesbotoc website
- Additional section for downloads (list of newsletter subscribers, speed daters or list of events) as well as a list of speed dating participants, who signed up via the Lesbotoc website with the possiblity to delete participants if wanted
- (possibility to add more admin credentials - work in progress)

## How to run the project

1. Set up a Database and Tables

2. Adapt DB connection settings.

3. Change URLs to your project's domain.

6. Run frontend in development mode with:  
   `npm start`

7. Build for production:  
   `npm run build`
