import { FC } from "react";

interface headingProps {
  title: string;
  className?: string;
}

const Heading: FC<headingProps> = ({ title, className = "" }) => {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {/* <p className='text-sm text-muted-foreground'>{description}</p> */}
    </div>
  );
};

export default Heading;
