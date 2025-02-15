Welcome to [Star Seeker](http://ec2-13-40-33-185.eu-west-2.compute.amazonaws.com/), an application developed by Hyperspace Tunneling Corp., with [Next.js](https://nextjs.org), and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Thank you for choosing us to plan your interstellar journey. We couldn't be more pleased to take your credits. Err, help you with your trip across the stars! Start your cosmic adventure now!

---

## Using the application

The homepage will show a listing of all available Gates. You can click on the row for a specific Gate to view additional information regarding that Gate. Information that is available is the Unique ID, Name, Gate Code, Creation Date, Last Updated Date, and Gates that this specific Gate is linked to.

At the bottom of the page you will be able to navigate to other functions of the application, namely the Journey Planner, and the Route Cost Calculator.

In the Journey Planner you can find the most affordable options for your trip. The tool is very simple to use; simply enter the Distance you are travelling (in AUs), how many people you are travelling with, and for how many days you will be parked. The tool will then calculate the most cost efficient trip for you and your space faring party, displaying the cost of the Journey, the Parking Fee, as well as the Total Cost. In addition, you will be presented with the available vehicle for your journey, as well as how many seats are available. The cost includes the price for your entire party, so if you need to travel with more than 1 vehicle, the cost is included in the Total Cost!

Planning your journey across the stars can be tough, with so many rules in place. So we present to you the Route Cost Calculator, a tool that will find the cheapest route for your trip, so you don't have to! Simply enter the Gate Code for your starting location and the Gate Code for the Gate you wish to travel to, and, voilá, you are presented with the cheapest travel options available! To make this tool even better, we have added an option to save these Routes so that you can easily view any cost calculations that you have searched for in the past!

---

## Technical Implementation

The application can be run by using the *dev* script.

```bash
npm run dev
```

The full suite of unit tests can be run with the *test* script.

```bash
npm test
```

Instructions on how the use the platform are listed above.

---

## Technical Considerations

I opted to using axios as my main way to connect to the API. Axios is a library I am most familiar with and seemed to fit the purpose quite well in connecting to the external API. In the code I intercept every request and inject the *x-api-key*. A similar method can be used for any form of authentication.

The API key and URL are stored as environment variables with dotenv.

Jest is being used for the Unit Tests. I do, however, fear I may have overdone it with the axios implementation, as I was facing various difficulties with mocking the axios responses. For that reason, and taking the time intended to dedicated to this project into account, I have decided to forego some of these units tests. With additional time, this is definitely something I would be looking into testing properly.

I created various reusable components across the application. These were some of the more obvious ones, and I am sure that I could create additional reusable components to even better promote code reusability.

For storing historical searches, I went with a local storage approach. This is probably the most simplistic approach, but it works really well and persists between sessions. It simply grabs the information from the local storage when the page loads. When a search is saved, it pushes the information to the UI, as well as storing it to local storage.

The website is designed in a responsive way, thanks to the utilisation of Tailwind CSS throughout the application.

I also edited the standard Layout to always include the website logo, as well as including a Footer component that always directs to the Homepage. All parts of the application can be reached from the Homepage.

The API information is currently stored in the compose.yaml file. Of course, this is not a good implementation, however it is also not a real-world scenario where the key is predefined for everyone at one specific value.

In terms of deployment, first a private key was generated on AWS. This key is needed for the Terraform deployment. This key is referenced by name and linked to the EC2 instance. Terraform can be used by using *terraform init*, followed by *terraform apply*. The app itself is hosted in a Docker container that sits in the EC2 instance. After creating a Docker build image, it is manually placed in the EC2 instance and run.

```bash
terraform init
terraform validate
terraform apply
```