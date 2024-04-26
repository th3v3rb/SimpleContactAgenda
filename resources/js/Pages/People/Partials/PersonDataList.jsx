export default function PersonDataList ({ person }) {
    return (
        <div className="space-y-2">
            <ul>
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Nombre o razón social:</span> {person.social_reason}
                </li>
                {person.birthday && (
                    <li className="flex items-center">
                        <span className="font-semibold mr-2">Fecha de nacimiento:</span> {person.birthday}
                    </li>
                )}
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Ciudad:</span> {person.city}
                </li>
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Dirección:</span> {person.address}
                </li>
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Tipo de persona:</span> {person.person_type}
                </li>
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Fecha de creación:</span> {person.created_at}
                </li>
                <li className="flex items-center">
                    <span className="font-semibold mr-2">Última modificación:</span> {person.updated_at}
                </li>
            </ul>
        </div>
    )
}
