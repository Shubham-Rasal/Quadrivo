import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface DescriptionProps {
  title: string;
  content1: string;
  content2: string;
  description: string; 
}

const Description: React.FC<DescriptionProps> = ({ title, content1, content2, description }) => {
  return (
    <Card className='basis-7/12 border-none'>
      <CardHeader>
        <CardTitle className='font-bold text-5xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content1}</p>
      </CardContent>
      <CardContent>
        <p>{content2}</p>
      </CardContent>
    </Card>
  );
};

export default Description;
