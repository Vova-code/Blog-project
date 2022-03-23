exports.seed = async function (knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {
      title: 'Avengers',
      content: 'Ho mais c\'est génial ! Un conglomérat de milliardaires en collants... quoi rêver de mieux ?',
      created_at: new Date(Date.parse('2021-12-10T14:48:00.000+01:00')).getTime(),
      user_id: 1
    },
    {
      title: 'Batman',
      content: 'C\'est la deuxième fois que j\'essaie de regarder un DC Comics en film et franchement j\'aimerais qu\'on me rembourse mon essence',
      created_at: new Date(Date.parse('2021-12-10T15:18:00.000+01:00')).getTime(),
      user_id: 2
    }
  ])
}
