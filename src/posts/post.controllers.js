const uuid = require("uuid");
const { blogDB } = require("../database/datablog");

const createPost = (data, user_id) => {
	const newPost = {
		id: uuid.v4(),
		title: data.title,
		content: data.content,
		header_image: data.header_image,
		user_id: user_id,
		published: true,
	};
	blogDB.push(newPost);
	return newPost;
};

const getAllPost = () => {
	return blogDB;
};

const getPostByID = (id) => {
	const data = blogDB.filter((item) => item.id === id);
	return data.length ? data[0] : false;
};

const getPostMyUser = (user_id) => {
	const data = blogDB.filter((item) => item.user_id === user_id);
	return data.length ? data : false;
};

const getPostMyUserById = (user_id, id) => {
	const data = blogDB.filter((item) => {
		return item.user_id === user_id && item.id === id;
	});
	return data.length ? data[0] : false;
};

const deleteMyPost = (user_id, id) => {
	const index = blogDB.findIndex((item) => item.id === id);

	if (index !== -1) {
		if (blogDB[index].user_id === user_id) {
			blogDB.splice(index, 1);
			return blogDB;
		}
	} else {
		return false;
	}
};

const updateMyPost = (user_id, id, data) => {
	const index = blogDB.findIndex((item) => item.id === id);
	if (index !== -1) {
		if (blogDB[index].user_id === user_id) {
			blogDB[index] = {
				id: id,
				title: data.title,
				content: data.content,
				header_image: data.header_image,
				user_id: user_id,
				published: true,
			};
			return blogDB;
		}
	}
	return false;
};
module.exports = {
	createPost,
	getAllPost,
	getPostByID,
	getPostMyUser,
	getPostMyUserById,
	deleteMyPost,
	updateMyPost,
};
