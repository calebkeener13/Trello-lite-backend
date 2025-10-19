// getAllUsers function

const getCurrentUser = (req, res) => {
    res.set('Content-Type', 'application/json')
    res.status(200).json({'name': 'Caleb', 'age': '20', 'DOB': '4/13/2005'})
};

const getAllUsers = (req, res) => {
    res.set('Content-Type', 'application/json')
    res.status(200).json({'users': [{'name': 'Caleb', 'age': '20', 'DOB': '4/13/2005'}, {'name': 'Carl', 'age': '18', 'DOB': '4/04/2007'}]})
};

module.exports = {getCurrentUser, getAllUsers}