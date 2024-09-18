CREATE TABLE Device(
    id INT AUTO_INCREMENT ,
    product_name VARCHAR(100),
    price int null,
    description TEXT,
    created_at DATETIME
);

firstly run the above query in the sql server to create the table in the database

--Make sure to change the connectionstring in the appsetting.json file



Run the Project:

click Ctrl +F5 button to run the project 


1.Insert Data:

Click the "Add Product" button.
Fill in the required fields (Product, Price, Description).
Click the "Submit" or "Save" button.
The newly inserted data should appear in the table.

2.View Data:

The table will display the existing data.
You can filter, sort, or search the data using any provided features.

3.Update Data:

Click the "Edit" or "Update" button for the desired row.
Modify the necessary fields.
Click the "Save" button.
The updated data will be reflected in the table.

4.Delete Data:

Click the "Delete" button for the row you want to remove.
Confirm the deletion if prompted.
The deleted row will be removed from the table.