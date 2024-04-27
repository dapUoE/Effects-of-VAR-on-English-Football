README:

In this document I will provide information on how to replicate my code, and any necessary information

--------------------
STRUCTURE

For this project, I used a jupyter notebook for all of the calculations and displaying the graphs used in the blog.pdf. These, along with the data used for the project, are all stored in the GitHub repository. The link to this repository is inside the blog.txt file.

Additionally, I hand made a blog site, and hosted it using GitHub pages. This blog site is made up of html, javastript, and css styling to add some dynamic displaying of graphs. The link to this blog is also in the blog.txt file, and is the main way I wish to present this project. The content is exactly the same as blog.pdf, but is presented more faithfully to an online blog.

Please note that on the online blog, I have added the ability to hover over data points for more precise or additional data, and added some animations to make the viewing experience more enjoyable.
---------------------
DATA

The folder titled "Data" in the GitHub repository contains all of the data used in the project. It contains EPL data from the 2000/2001 season to the 2023/2024 season. All of these files are in .csv format.

Additionally, there are some .txt files provided for extra information about the data, as included by the original data source.

I created combined_data.csv as a way to view the data visually to ensure the data imported correctly. I also created Causal_Forest_Outputs to take perform an analysis of multiple CATE values by running the python script multiple times and collecting all of the values.
---------------------
VAR_Analysis.ipynb

This file is where the bulk of the analysis takes place. You can see a lot of data analysis and graphs, some of which were not picked for the blog post, as I decided to only write about the most interesting findings.

In order to use this file for yourself, you must edit the PATH at the top of the file



