<div align='center'>
   <a href="https://dt-rekomendasi.vercel.app">
    <h1>Double Track Recommendation Web</h1>
  </a>

  <p>A Web Based Recommendation System For Double Track Program Skill Selection</p>
</div>

## Description

Double Track is a program in East Java Province aimed at reducing unemployment among high school graduates by offering skills training in seven fields: multimedia, culinary arts, fashion design, beauty care, electrical engineering, electrical installation, and light vehicle engineering. However, if students choose a field that doesn't match their aspirations, it can lead to wasted time and frustration. To address this, a web-based recommendation system is being developed. It uses the AHP and TOPSIS method to help students select a skill field based on factors like job availability, salary, interest, facility support, and entrepreneurial opportunities, aiming to provide informed decision-making support.

## Important Resource

- [What is AHP?](https://en.wikipedia.org/wiki/Analytic_hierarchy_process)
- [Double Track REST API](https://github.com/albugowy15/api-double-track)

## Running Locally

To run this project locally, ensure that you have installed all the necessary tools on your machine:

- [Node.js LTS](https://nodejs.org/en)
- [pnpm version 9 or higher](https://pnpm.io)

Then, you can follow these steps:

1. Clone this repository

```bash
git clone https://github.com/albugowy/double-track-recommendation-web.git
cd double-track-recommendation-web
```

2. Set all the required environment variables. You can find the necessary environment variables in the `.env.example` file.
3. Install all dependencies

```bash
pnpm install
```

4. Run your project in development mode

```bash
pnpm dev

# or with turbopack
pnpm dev --turbo
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## With Docker

This project includes a `Dockerfile` and a `docker-compose.yml` file to facilitate running the project using Docker. Before starting, ensure you've created a `.env` file based on `.env.example` and filled it with all the required environment variables.

To begin, build the container using the following command:

```bash
docker build -t double-track-recommendation-web .
```

Then, run the container with:

```bash
docker run -p 3000:3000 double-track-recommendation-web
```

Alternatively, you can use Docker Compose to handle building and running the container:

```bash
docker-compose up --build
```

## Tech Stacks

- **Next.js**: This is a React framework renowned for its ability to render pages on the server side and generate static websites for React-based web applications. It's a powerful tool for building highly performant and SEO-friendly web experiences.
- **NextAuth**: A robust authentication solution designed explicitly for Next.js applications. It seamlessly integrates with Next.js and Serverless architectures, providing a hassle-free way to implement secure authentication flows.
- **Tailwind**: Tailwind CSS is a utility-first CSS framework equipped with a plethora of pre-defined classes. Its unique approach allows developers to compose designs directly within their markup, offering unparalleled flexibility and efficiency in styling web applications.
- **Vercel**: Vercel serves as a cloud platform tailored for hosting static sites and Serverless Functions. Its seamless integration with workflows enables developers to deploy Jamstack websites and web services instantly, with automatic scaling and minimal configuration required.
