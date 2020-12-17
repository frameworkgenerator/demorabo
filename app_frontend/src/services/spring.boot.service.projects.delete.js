import { notification } from 'antd'
import base64 from 'base-64'

export default async function DeleteProjects(data) {
  console.log('try to set project')
  console.log(JSON.stringify(data))
  const result = await fetch(`http://localhost/api/project/deletebyid/${data.id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`${sessionStorage.getItem('email')}:${sessionStorage.getItem('password')}`)}`,
    },
    body: JSON.stringify(data),
  }).catch(error =>
    notification.warning({
      message: error.code,
      description: error.message,
    }),
  )
  console.log(result)
  return result
}
