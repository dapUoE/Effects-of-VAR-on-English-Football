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

In order to use this file for yourself, you must clone the github repository on your local machine, and change the path to point to the data folder included in the GitHub repository. This is indicated quite clearly in the jupyter file itself.

The rest of the file will run off of that, provided that all of the files remain unchanged and in the same directories.
---------------------
Output.pdf

This pdf shows the outputs of all of the sections of VAR_Analysis.ipynb
---------------------
Analysing_the_effects_of_VAR_on_English_Football_Blog.pdf

This file is the pdf version of the blog, containing the python versions of the graphs. I did this to ensure that if there are issues with the website, or yo uwish to see the python outputs, then this provides a simple solution.
---------------------
Blog_Post_Site
-blog_post.html
-script.js
-styles.css
-foul_data.json
-goal_data.json
-team_data.json

This directory contains all of the code for the blog post website. blog_post.html, script.js, and styles.css contain all of the html, javascript, and css styles respectively.

the .json files are used to contruct the interactive graphs on the blog website, and they have been made up of the data analysis in VAR_Analysis.ipynb in the parent directory. None of these files need to be edited as GitHub has taken care of the hosting of the website, and the link to it is provided in blog.txt in the parent directory.

blog_post.html is a basic html file, I have provided small amounts of comments, but the code is quite easy to understand.

script.js is where almost all of the logic is. I have used javascript to recreate the graphs produced in python. For your convenience, I have attached a normal pdf version of the blog in the main directory so you can see the python graphs instead if you wish. I have also put in a lot of comments to help understand how all of the logic works.

styles.css is very minor and contains some styling for various elements on the web page.




