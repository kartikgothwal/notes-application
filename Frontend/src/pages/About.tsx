import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const messages = [
  `As a Full Stack Developer, I possess an impressive arsenal of skills in React.js,Redux Tailwind CSS, JavaScript, Node.js, Express.js, Firebase, HTML, CSS, Styled Component and Material UI`,
  ` I have developed multiple projects which helped me to enhance my skills. `,
  `Yes, having your strong base really helps and hence I am open to adapting to whichever framework is required.`,
  `I believe Project Based Learning is the best approach to learn anything.`,
  `Hence, I've got projects in all the different technologies that I've learned over time.`,
  `By the way, when I'm not coding, you'll find me reading non-fiction, or watching UFC, or playing chess : )For fetching the notes of the logged in user Custom Express APIs are used.`,
];
const features = [
 `Notes is a cloud based Notes app build to store user's notes anytime, anywhere on the cloud with easy access to their notes.`,
  `The App is build using the popular technologies like React JS MongoDB, Express Js and NodeJS.`,
  `Tailwind is Used as the CSS Framework for styling the App.`,
  `shadcn-ui is used as the component library for the App with radix-ui.`,
  `The App is completely TypeSafe with Typescript.`,
  `ALl the forms are completely typeSafe with ZOD and react-hook-form.`,
  `Vite JS is used as the bundler`,
  `For fetching the notes of the logged in user Custom Express APIs are used.`,
];

const About = () => {
  return (
    <div className="container py-10">
      <Heading title="Notes" className="text-center" />
      <Separator className="mt-5 mb-8" />
      <ul className="flex flex-col max-w-4xl gap-3 mx-auto list-[square]">
        {messages.map((message, i) => (
          <li key={i} className="text-lg font-semibold tracking-wider">
            {message}
          </li>
        ))}

        <li className="text-lg font-semibold tracking-wider">
          Some Features of Notes
          <ul className="flex flex-col gap-2 px-5 py-3 text-base list-disc">
            {features.map((feature, i) => (
              <li key={i} className="text-lg font-semibold tracking-wider">
                {feature}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default About;
