import { createMap, createMapper, forMember, mapFrom, typeConverter } from '@automapper/core';
import { classes } from '@automapper/classes';
import { Compania, Competidor, CompetidorFile, Delegacion, DelegacionFile, Torneo, TorneoFile, User } from '../entities';
import { CompaniaDto, CompetidorDto, CompetidorFileDto, DelegacionDto, DelegacionFileDto, TorneoDto, TorneoFileDto, UserDto } from '../dtos';
import { calculateYearsOld } from '../helpers/UtilHelper';
import * as encriptHelper from '../helpers/EncriptHelper';
import { EncriptEnum } from '../helpers/enums/generalEnum';

// Create and export the mapper https://automapperts.netlify.app/docs/tutorial/mapping-configurations
export const mapper = createMapper({
    strategyInitializer: classes(),
});

export const autoMappers = () => {

    createMap(mapper, Compania, CompaniaDto, 
        forMember(
            (destination) => destination.param1,
            mapFrom((source) => source.param1)
        ),
    )

    createMap(mapper, CompetidorFile, CompetidorFileDto)

    createMap(mapper, Competidor, CompetidorDto,
        forMember(
            (destination) => destination.compnombrecompleto,
            mapFrom((source) => source.compnombre + ' ' + source.compapellido)
        ),
        forMember(
            (destination) => destination.compfecnacstr,
            mapFrom((source) => source.compfecnac ? new Intl.DateTimeFormat("en-GB").format(source.compfecnac) : '')
        ),
        forMember(
            (destination) => destination.compedad,
            mapFrom((source) => calculateYearsOld(source.compfecnac))
        ),
        forMember(
            (destination) => destination.perfil,
            mapFrom((source) => source.competidorPerfil?.ID | 0)
        ),
        typeConverter(Date, String, 
            (date) => date ? new Intl.DateTimeFormat("en-GB").format(date) : ''
        )    
    )

    createMap(mapper, DelegacionFile, DelegacionFileDto)

    createMap(mapper, Delegacion, DelegacionDto, 
        forMember(
            (destination) => destination.delegaredes,
            mapFrom((source) => source.delegaredes)
        ),
        // forMember(
        //     (destination) => destination.logo,
        //     mapFrom((source) => source.delegacionLogo?.ID | 0)
        // ),
    )
    
    createMap(mapper, TorneoFile, TorneoFileDto)

    createMap(mapper, Torneo, TorneoDto, 
        forMember(
            (destination) => destination.fullDescri,
            mapFrom((source) => source.torneonombre + ' ' + source.torneodescri)
        ),
        forMember(
            (destination) => destination.portada,
            mapFrom((source) => source.torneoFiles[0]?.ID | 0)
        ),
        typeConverter(Date, String, 
            //(date) =>  date?.toDateString()
            (date) => date ? new Intl.DateTimeFormat("en-GB").format(date) : ''
        )
    )

    createMap(mapper, User, UserDto, 
        forMember(
            (destination) => destination.usercodigo,
            mapFrom((source) => encriptHelper.encrip({sTexto: source.usercodigo, sProceso: EncriptEnum.Desencriptar}, true))
        ),
        forMember(
            (destination) => destination.usernombre,
            mapFrom((source) => encriptHelper.encrip({sTexto: source.usernombre, sProceso: EncriptEnum.Desencriptar}, true))
        ),
        forMember(
            (destination) => destination.userstatus,
            mapFrom((source) => encriptHelper.encrip({sTexto: source.userstatus, sProceso: EncriptEnum.Desencriptar}, true))
        ),
        forMember(
            (destination) => destination.usercodper,
            mapFrom((source) => encriptHelper.encrip({sTexto: source.usercodper, sProceso: EncriptEnum.Desencriptar}, true))
        ),
    )
}

