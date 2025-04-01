const { exec } = require('node:child_process')

function checkPostgres() {
  let containerName = process.env.SITE_NAME ?? 'mydash'
  containerName = `${containerName}-postgres`.toLowerCase()

  exec(`docker exec ${containerName} pg_isready --host localhost`, handleReturn)

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.')
      checkPostgres()
      return
    }

    console.log('\n🟢 Postgres is ready and accepting connections!\n')
  }
}

process.stdout.write('\n\n🔴 Waiting for Postgres to accept connections\n')
checkPostgres()
