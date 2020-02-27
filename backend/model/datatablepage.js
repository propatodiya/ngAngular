class NgDataTablePage {
    constructor(size, totalElements, totalPages, pageNumber) {
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
    }
}
module.exports = NgDataTablePage;