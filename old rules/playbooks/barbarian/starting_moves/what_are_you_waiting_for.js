What Are You Waiting For:
  text: >
    When you cry out a challenge to your enemies
  trigger: 'When you cry out a challenge to your enemies'
  effect: 
    roll roll+Con:
      success:
        - They treat you as the most obvious threat to be dealt with and ignore your companions.
        - modify "damage against them" +2 ongoing
	  partialSuccess: Only a few (the weakest or most foolhardy among them) fall prey to your taunting.
