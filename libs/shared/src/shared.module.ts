import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [],
})
export class SharedModule {
  static registerTCP(serviceName: string, hostName: string, portName: string) {
    const providers = [
      {
        provide: serviceName,
        useFactory: (configService: ConfigService) => {
          console.log('hostName', configService.get(hostName));
          console.log('portName', configService.get(portName));
          return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              host: configService.get(hostName),
              port: configService.get(portName),
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
