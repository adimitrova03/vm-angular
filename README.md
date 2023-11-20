# vending-machine
A vending machine simulation application built on Angular

Steps to start the app:
1. Npm install
2. Ng serve

User manual: 
1. An amount of money must be added first. By clicking on the 'coins' button, a dialogue box opens with the possible coins. Clicking on the corresponding ones increases the amount. There are two buttons one to move forward and one to get your money back.
2. The code of the corresponding product must be entered through a combination of the displayed buttons. Each product has a corresponding code and value that are displayed below it. Each code should be exact two characters. You cannot add more than two.
3. There are 3 buttons on the keyboard:
Del - deletes only the last character
Res - deletes all characters
Buy - to purchase an item
4. There are different checks that will not allow the purchase of a product under different circumstances:
- if the product is out of stock
- if the funds are not enough to purchase the product
- if the entered code does not correspond to a real product or the code is shorter than the required length
In this cases an error message will be shown on the display for 4 seconds.