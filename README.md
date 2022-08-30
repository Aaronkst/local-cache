# Local Cache

## Installation

    npm install @aaron_kst/local-cache --save

## Initialization

### Common JS

    const LocalCache = require("@aaron_kst/local-cache");

### Module JS

    import LocalCache from "@aaron_kst/local-cache";

### Setup & Configuration

This will create a "/cache" directory within your project folder. Inside the directory will be a json file named according to your constructor argument.

    const Cache = new LocalCache("Foo");

## Methods

### Set Item

This method is used to save an item into your cache.

    const foo = Cache.setItem("foo", "bar");
    console.log(foo) // true;

### Get Item

This method is used retrieve an item saved into the local cache.

    const foo = Cache.getItem("foo");
    console.log(foo) // bar;
