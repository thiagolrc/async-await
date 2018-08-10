const users = [{
    id: 1,
    name: 'Thiago',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 999
} , {
    id: 3,
    name: 'Newbie',
    schoolId: 0
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 91
}, {
    id: 3,
    schoolId: 101,
    grade: 71
}];

const getUser = (id) => {
    return new Promise(((resolve, reject) => {
        var usr = users.find(u => u.id === id);
        if (usr) {
            resolve(usr);
        } else {
            reject(`Unable to finde usr with id ${id}`);
        }
    }));
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        var grds = grades.filter(grade => grade.schoolId === schoolId);
        resolve(grds);
    });
};

//Andrew has 83% in the class
const getStatus = (userId) => {
    var user; //we need to define a variable so that we can store the user and have access to it inside the second Promise
    return getUser(userId).then(usr => {
        user = usr;//storing user so that we can use it inside the next Promise
        return getGrades(usr.schoolId);
    }).then(grades => {
        var avg = grades.map(g => g.grade).reduce((a, b) => a + b) / grades.length;
        return `${user.name} has ${avg}% in the class`;
    }); 
};

const getStatusAlt = async (userId) => { //the result will be a Promise
    var user = await getUser(userId);
    var grades = await getGrades(user.schoolId);
    if (grades.length === 0) {
        throw new Error(`User ${user.name} has no grade in the class`);// == Promise.reject();
    }
    var avg = grades.map(g => g.grade).reduce((a, b) => a + b) / grades.length;
    return `${user.name} has ${avg}% in the class`; // == Promise.resolve();
};

getStatusAlt(3)
    .then(status => console.log(status))
    .catch(e => console.log(e.message));

// getStatus(2)
//     .then(str => console.log(str))
//     .catch(e => console.log(e));