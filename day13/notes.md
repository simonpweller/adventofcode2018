- loop through the grid, parse out carts and replace them with tracks
- each turn:
	- sort the carts
	- for each cart
		- determine the coordinates of the cell it it headed to
		- check if there is a cart on that cell already - if yes -> return cell coordinates
		- determine the track type of target cell
		- if it's an intersection
			- check the carts next turn direction
			- update the cart location
			- update the carts orientation
			- update the carts next turn direction
		- if it's a turn
			- update the cart location
			- update the carts orientation
		- else
			- update the cart location