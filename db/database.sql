CREATE TABLE users (
    id VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(255),
    profile_url TEXT,
    nidn_or_nim VARCHAR(255) UNIQUE,
    nama_perguruan_tinggi VARCHAR(255),
    role VARCHAR(255),
    create_at DATETIME,
    update_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id VARCHAR(255) PRIMARY KEY,
    img_url TEXT,
    content TEXT,
    users_id VARCHAR(255),
    count_answers INT,
    count_like INT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE posts_like (
    id VARCHAR(255) PRIMARY KEY,
    posts_id VARCHAR(255),
    users_id VARCHAR(255),
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (posts_id) REFERENCES posts(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE answers (
    id VARCHAR(255) PRIMARY KEY,
    posts_id VARCHAR(255),
    users_id VARCHAR(255),
    answers TEXT,
    vote_up INT,
    vote_down INT,
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (posts_id) REFERENCES posts(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE vote_up (
    id VARCHAR(255) PRIMARY KEY,
    answers_id VARCHAR(255),
    users_id VARCHAR(255),
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (answers_id) REFERENCES answers(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE vote_down (
    id VARCHAR(255) PRIMARY KEY,
    answers_id VARCHAR(255),
    users_id VARCHAR(255),
    create_at DATETIME,
    update_at DATETIME,
    FOREIGN KEY (answers_id) REFERENCES answers(id),
    FOREIGN KEY (users_id) REFERENCES users(id)
);
