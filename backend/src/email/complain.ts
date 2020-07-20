
import { EMAILconf, MAINconf } from '../../config/conf';

export default (email: string, videoId: string) => {
  return {
    to: email,
    from: EMAILconf.email,
    subject: 'Жалоба',
    html: `
      <h1>Поступила жалоба</h1>
      <a href="${MAINconf.url}/movie/${videoId}">Рассмотерть заявку</a>
    `
  }
}