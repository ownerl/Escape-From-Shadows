# Escape From Shadows
Take the role of a hapless adventurer lost in the shadowy woods. Explore your dark surroundings to find a way to escape these woods while avoiding the danger lurking in the dark.

## About
Escape From Shadows will be a top down 2D exploration game where the playable area (henceforth refered to as a map), a spooky forest, is enshrouded in shadows, thus limiting the player's vision. The player shall start at a spot on the map with a lantern where they will be given a short grace period to explore their immediate surroundings. 

After the grace period, an enemy will spawn somewhere on the map (a set minimum distance from player) and slowly stalk the player with a lit lantern with only their glowing red eye visible in the darkness. The player will have the ability to turn off their lantern which will cause the enemy to approach the player's last known location; the tradeoff is that the player will not be able to see their surroundings while moving and may encounter nautral hazards or barriers. The player wins by escaping from a designated spot, or loses by dying to the enemy.

## Tech Used
- HTML/CSS/Canvas
- Javascript
- Procreate for art

## Wireframes

![Escape From Shadows Wireframe Mockup](images/wireframe.png)

## MVP Goals
- Complete map
- Render lantern lighting effect
- Functional player with movement
- Functinal enemy that chases player and is affected by lighting
- Enemy based lose condition 
- Win condition for escaping
- "Key" or "Object" required to find to unlock escape
- Render game over
- Render control scheme and player task (tutorial/help message)

## Stretch Goals
- Additional enemy behaviour (search a radius of the player's last known location)
- Natural hazards like pits or traps the player may run into (and die)
- Multiple objects or keys to collect (some optional)
- Mini-puzzles or tasks to unlock objects/keys
- Map randomization - player/enemy spawn, object/key placement, escape placement, hazard placement
- Music and sound effects
- More detailed art