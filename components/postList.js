import React from 'react';
import { ScrollView, View } from 'react-native';
import Post from './post';

const PostList = () => {
  const posts = [
    {
        imageUri: 'https://img.freepik.com/free-photo/girl-student-kid-smiling-silly-laughing-posing-delighted-cheering-turn-camera-playful-upbeat-expression_176420-44774.jpg',
        name: 'Pop Ioana',
        captiom: "I'm Ioana, a 16-year-old creative soul living in a small village in rural Romania. Despite the financial challenges my family faces, I'm determined to pursue my passions and build a brighter future. On a typical day, you'll find me waking up early to help my mother with our household chores before embarking on the long, 5-kilometer walk to school. It's a tiring commute, but I never let it deter me from completing the daily learning activities posted by my teachers on the platform. This is my chance to demonstrate my dedication and commitment.",
        date: 'August 30, 2024',
        sponsored: 'true'
    },
    {
      imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjt_rgIyq-vlv7WKrzOuVmzZhW228wNjr4w&usqp=CAU',
      name: 'Jordan Andreea',
      captiom: "My name is Andreea and I'm a 14-year-old student living in a small village in the countryside of Romania. As the oldest of three siblings, I've had to shoulder a lot of responsibility at home, but education is my top priority.",
      date: 'September 20, 2024',
    },
    {
        imageUri: 'https://www.kidsopia.com/wp-content/uploads/2019/12/Copil-nervos-poza-1.jpg',
        name: 'Shawn Marius',
        captiom: "Hi, my name is Marius and I'm a 16-year-old high school student living in a small rural village in Romania. Coming from a low-income family, I've faced a lot of challenges in my educational journey, but I'm determined to overcome them.",
        date: 'March 13, 2024',
        sponsored : 'true'
      },
    {
      imageUri: 'https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwYm95fGVufDB8fDB8fHww',
      name: 'Haven Lynton',
      captiom: "My name is Vlad and I'm a 15-year-old high school student living in a rural village in Romania. Growing up, I've faced a lot of challenges, but I'm determined to work hard and create a better life for myself.On a typical day, I wake up early to help my father on our small family farm before making the long walk to school. The commute is tough, but I always make sure to complete the daily learning challenges posted by my teachers on the platform. I see this as my chance to show my dedication and commitment",
      date: 'September 19, 2024',
      sponsored: 'true'
    },
   
    // Add more posts as needed
  ];

  return (
    <ScrollView style={{ paddingTop: 10, paddingBottom:600 }} contentContainerStyle={{ flexGrow: 1 }}>
      {posts.map((post, index) => (
        <Post
          key={index}
          imageUri={post.imageUri}
          name={post.name}
          date={post.date}
          caption={post.captiom}
          sponsored={post.sponsored}
        />
      ))}
    </ScrollView>
  );
};

export default PostList;