import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyEmailDto } from './dtos/notify-email.dto';
import * as nodemailer from 'nodemailer';
@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  async notifyEmail(notifyEmailDto: NotifyEmailDto) {
    const { email, text } = notifyEmailDto;
    console.log('notifyEmail', email, text);
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleepr Notification',
      text,
    });
  }
}
