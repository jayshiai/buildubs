import { Accordion } from "dubsui"

export default function AccordionDemo() {
  const data = [
    {
      title: "What is DubsUI?",
      content: `DubsUI is a component library for React.js
         that provides a set of reusable components 
         for building web applications.`,
    },
    {
      title: "Who maintains DubsUI?",
      content: (
        <p>
          <a
            className=" text-blue-600 underline"
            href="https://github.com/jayshiai"
          >
            @jayshiai
          </a>{" "}
          along with 3Dubs under DevsTomorrow maintain DubsUI.
        </p>
      ),
    },
    {
      title: "What does DubsUI stand out for?",
      content: `DubsUI aims to provide a more data 
        focused approach to building web applications, 
        where user provides data and DubsUI takes
         care of the rest. However it also 
         alows for more granular control on 
         the design of components.`,
    },
    {
      title: "What insprised DubsUI?",
      content: `DubsUI is mainly built on top of 
        Radix UI and derives some inspiration 
        from shandcnUI.`,
    },
  ]
  return <Accordion items={data} />
}
