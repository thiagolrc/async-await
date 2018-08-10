const users = [{
    id: 1,
    name: 'Thiago',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 999
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
    var user;
    return getUser(userId).then(usr => {
        user = usr;
        return getGrades(usr.schoolId);
    }).then(grades => {
        var avg = grades.map(g => g.grade).reduce((a, b) => a + b) / grades.length;
        return `${user.name} has ${avg}% in the class`;
    }); 
};

getStatus(2)
    .then(str => console.log(str))
    .catch(e => console.log(e));