const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./calendar.db')
const events = [
  {title:'Project Sync', start:new Date(Date.now()+3600*1000).toISOString(), end:new Date(Date.now()+2*3600*1000).toISOString(), color:'#34d399'},
  {title:'Study', start:new Date(Date.now()+24*3600*1000).toISOString(), end:new Date(Date.now()+25*3600*1000).toISOString(), color:'#60a5fa'}
]
db.serialize(()=>{
  const s = db.prepare('INSERT INTO events(title,start,end,color) VALUES(?,?,?,?)')
  events.forEach(e=>s.run(e.title,e.start,e.end,e.color))
  s.finalize(()=>db.close())
})
