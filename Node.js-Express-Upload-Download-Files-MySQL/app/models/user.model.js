module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
	  name: {
		type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING
	  },
	  phone: {
		type: Sequelize.STRING
	  },
	  image: {
		type: Sequelize.STRING
	  },
	  title: {
		type: Sequelize.STRING
	  }
	});
	
	return User;
}