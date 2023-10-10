const router = require('express').Router()
const books = require('./books_dumb')


let bookDirectory = books

router.get('/books', (req, res)=>{
res.send(bookDirectory)
})

router.get('/books/:id', (req, res)=>{
    const {id} = req.params;
    const book = bookDirectory.find(b => b.isbn === id)
    if(!book) {return res.status(404).send('Book does not exist')}

        res.send(book)
})

router.post('/books', (req, res)=>{
const {
title,
isbn,
pageCount,
publishedDate,
thumbnailUrl,
shortDescription,
longDescription,
status,
authors,
categories
} = req.body;

const bookExist = bookDirectory.find(i=> i.isbn === isbn )
if(bookExist) return res.send('book already exist');

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    bookDirectory.push(book)
    res.send(book)
}
);

router.put('/books/:id', (req, res)=>{
const { id} = req.params
const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories
    } = req.body;
    const findBook= bookDirectory.find(b=> b.isbn === id)
    if(!findBook) return res.send('book does not exist')
    
    const updateField = (val, prev)=> {val ? prev : val}
    const updateBook = {
        ...findBook,
        title: updateField(title, findBook.title),
        isbn : updateField(isbn, findBook.isbn),
        pageCount: updateField(pageCount, findBook.pageCount),
        publishedDate: updateField(publishedDate, findBook.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, findBook.thumbnailUrl),
        shortDescription: updateField(shortDescription, findBook.shortDescription),
        longDescription: updateField(longDescription, findBook.longDescription),
        status: updateField(status, findBook.status),
        authors: updateField(authors, findBook.authors),
        categories: updateField(categories, findBook.categories)
    }
    const findIndex = bookDirectory.findIndex(i => i.isbn=== id)
    bookDirectory.splice(findIndex, 1, updateBook)
    res.send(updateBook)
})
router.delete('/books/:id', (req, res)=>{
const {id} =req.params;
let book = bookDirectory.find(b=>b.isbn === id)
if(!book) return res.status(404).send('bood does not exist')
bookDirectory= bookDirectory.filter(b =>b.isbn !== id)
res.send("Success")
})



module.exports = router