import { Table,Model,Column,DataType } from "sequelize-typescript";



@Table({
    tableName: User.VAR_TABLE_NAME
})
export class User extends Model{

    public static VAR_TABLE_NAME = "TD_User" as string;
    public static VAR_ID = "Uti_id"  as string;
    public static VAR_NOM = "Uti_nom"  as string;
    public static VAR_PRENOM = "Uti_prenom"  as string;
    public static VAR_EMAIL = "Uti_email"  as string;
    public static VAR_PASSWORD = "Uti_password"  as string;
    public static VAR_FIRSTLOG = "Uti_firstlog"  as string;
    public static VAR_STATUT = "Uti_statut"  as string;
    public static VAR_TELEPHONE = "Uti_telephone"  as string;
    public static VAR_ADRESSE = "Uti_adresse"  as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User.VAR_ID
    })
    id!: number

    @Column({
        type: DataType.STRING,
        field: User.VAR_NOM
    })
    nom!: string

    @Column({
        type: DataType.STRING(100),
        field: User.VAR_PRENOM
    })
    prenom!: string

    @Column({
        type: DataType.STRING,
        field: User.VAR_EMAIL
    })
    email!: string


    @Column({
        type: DataType.STRING,
        field: User.VAR_PASSWORD
    })
    password!: string


    @Column({
        type: DataType.BOOLEAN,
        field: User.VAR_FIRSTLOG,
    })
    firstLog!: boolean


    @Column({
        type: DataType.BOOLEAN,
        field: User.VAR_STATUT,
    })
    statut!: boolean


    @Column({
        type: DataType.STRING,
        field: User.VAR_TELEPHONE,
    })
    telephone!: string

}