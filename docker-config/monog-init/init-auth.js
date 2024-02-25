db.createUser({
  user: 'root',
  pwd: 'root1234',
  roles: [
    {
      role: 'readWrite',
      db: 'main',
    },
  ],
});
