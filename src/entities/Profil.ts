import { Model, Table, DataType, Column } from 'sequelize-typescript'


@Table({
    tableName: Profil.VAR_TABLE_NAME
})
export class Profil extends Model{

    public static VAR_TABLE_NAME = "TP_Profil" as string;
    public static VAR_ID = "Pro_id"  as string;
    public static VAR_CODE = "Pro_code"  as string;
    public static VAR_LIBELLE = "Pro_libelle"  as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Profil.VAR_ID
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        field: Profil.VAR_CODE
    })
    code!: string

    @Column({
        type: DataType.STRING,
        field: Profil.VAR_LIBELLE
    })
    libelle!: string

}