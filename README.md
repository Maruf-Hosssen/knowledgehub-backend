For running the project locally:https://assignment-4-beta.vercel.app/
api documentation link : https://documenter.getpostman.com/view/31434202/2s9YkuaJWs

admin login :-
username : maruf
password : maruf
user login :-
username : kalam
password : kalam

1.User ragistration: https://assignment-4-beta.vercel.app/api/auth/register
Demo data : {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
}

2.User login :  https://assignment-4-beta.vercel.app/api/auth/login
Demo data : {
    "username": "maruf",
    "password": "maruf"
}

3.Change password : https://assignment-4-beta.vercel.app/api/auth/change-password
Demo data : {
    "currentPassword": "maruf",
    "newPassword": "maruf123"
}

4.Create course(only admin can do) : https://assignment-4-beta.vercel.app/api/courses
Demo data : {
                    {
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false}
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
    }
}
}

5.Get course : https://assignment-4-beta.vercel.app/api/courses(get request)

6.Create category(only admin can do) : https://assignment-4-beta.vercel.app/api/categories
Demo data : {
    "name": "Web Development"
}
7.Get all category : https://assignment-4-beta.vercel.app/api/categories(get request)

8.Create a review(only user can do) : https://assignment-4-beta.vercel.app/api/reviews
Demo data : {
    "courseId": "67890fghij54321abcde",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}

9.Updata course (only admin can do): https://assignment-4-beta.vercel.app/api/courses/:courseId
Demo data : {
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}

10.Get course with reviews : https://assignment-4-beta.vercel.app/api/courses/:courseId/reviews(get request)

11.Get the best course :  https://assignment-4-beta.vercel.app/api/course/best(get request)