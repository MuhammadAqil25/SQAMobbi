import { group } from "k6";
import http from "k6/http";
import generateHeaders from "../utils/generateHeaders.js";


export default function productsGroups(token) {
    group('Products DummyJson API', function(){
        http.get('https://dummyjson.com/auth/products', generateHeaders(token))
        http.get('https://dummyjson.com/auth/products/1', generateHeaders(token))
        http.get('https://dummyjson.com/auth/products/search?q=phone', generateHeaders(token))
        http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price', generateHeaders(token))
        http.get('https://dummyjson.com/auth/products/categories', generateHeaders(token))
        http.get('https://dummyjson.com/auth/products/category/smartphones', generateHeaders(token))
        http.post('https://dummyjson.com/auth/products/add', JSON.stringify({title: 'BMW Pencil'}) ,generateHeaders(token))
        http.put('https://dummyjson.com/auth/products/1', JSON.stringify({title: 'iPhone Galaxy +1'}) ,generateHeaders(token))
        http.del('https://dummyjson.com/auth/products/1', generateHeaders(token))

        // group('Get All Products', function() {
        //     http.get('https://dummyjson.com/auth/products', generateHeaders(token))
        // })
        // group('Get a single product',function() {
        //     http.get('https://dummyjson.com/auth/products/1', generateHeaders(token))
        // })
        // group('Search products',function() {
        //     http.get('https://dummyjson.com/auth/products/search?q=phone', generateHeaders(token))
        // })
        // group('Limit and skip products',function() {
        //     http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price', generateHeaders(token))
        // })
        // group('Get all products categories',function() {
        //     http.get('https://dummyjson.com/auth/products/categories', generateHeaders(token))
        // })
        // group('Get products of a category',function() {
        //     http.get('https://dummyjson.com/auth/products/category/smartphones', generateHeaders(token))
        // })
        // group('Add a new product',function() {
        //     http.post('https://dummyjson.com/auth/products/add', JSON.stringify({title: 'BMW Pencil'}) , headers ,generateHeaders(token))
        // })
        // group('Update a product',function() {
        //     http.put('https://dummyjson.com/auth/products/1', JSON.stringify({title: 'iPhone Galaxy +1'}) , headers ,generateHeaders(token))
        // })
        // group('Delete a product',function() {
        //     http.del('https://dummyjson.com/auth/products/1', generateHeaders(token))
        // })

})
}