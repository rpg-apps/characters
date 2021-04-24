import Move from '../move'
import Procedure, { choice, roll, doDamage, takeDamage, simultaneous } from '../move_procedure'

const hackAndSlash = new Move({
  title: 'Hack and Slash',
  text: 
`When you attack an enemy in melee, roll+Str.
* On a 10+, you deal your damage to the enemy and avoid their attack. At your option, you may choose to do +1d6 damage but expose yourself to the enemy’s attack.
* On a 7–9, you deal your damage to the enemy and the enemy makes an attack against you.`,

  procedure: new Procedure('When you attack an enemy in melee', roll('roll+Str', {
    success: choice('You may choose to do +1d6 damage but expose yourself to the enemy’s attack.', {
      'Take +1d6 damage': simultaneous(doDamage('+1d6'), takeDamage()),
      'Don’t expose yourself to the enemy’s attack': doDamage()
    }),
    partialSuccess: simultaneous(doDamage(), takeDamage())
  }))
})

export default hackAndSlash