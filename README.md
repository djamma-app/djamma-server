# Djamma server

A server for Djamma.

## Development

### Install

```
yarn
```

### Run

```
yarn dev
```

### Contributing

Run the following before committing :

```
yarn pretty && yarn lint && yarn test
```

### DB setup

- Install MariaDB
- Create user  :
```
{
  "username": "djamma",
  "password": "password",
}
```
- Create database `djamma`
- Grant rights on djamma database to the djamma user
