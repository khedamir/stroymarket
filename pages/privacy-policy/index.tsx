import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import Arrow from '../../public/images/left-arrow.svg';
import styles from './Privacy.module.scss';

const Privacy = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  return (
    <div className={`${styles.privacy} ${styles[theme]}`}>
      <Arrow onClick={() => router.back()} className={styles.arrow} />
      <h2>Политика обработки персональных данных в ООО «КОМПЛЕКТСТРОЙ»</h2>
      <div>
        Настоящая Политика содержит описание принципов и подходов ООО «КОМПЛЕКТСТРОЙ» в отношении обработки и
        обеспечения безопасности персональных данных, обязанности и ответственность ООО «КОМПЛЕКТСТРОЙ» при
        осуществлении такой обработки.
        <br />
        ООО «КОМПЛЕКТСТРОЙ» полностью обеспечивает соблюдение прав и свобод граждан при обработке персональных данных, в
        том числе обеспечивает защиту прав на неприкосновенность частной жизни, личной и семейной тайн.
        <br />
        Субъектами персональных данных, обработка которых осуществляется ООО «КОМПЛЕКТСТРОЙ», являются:
        <ul>
          <li>кандидаты на трудоустройство;</li>
          <li>работники;</li>
          <li>представители контрагентов;</li>
          <li>клиенты – физические лица;</li>
          <li>корпоративные клиенты – юридические лица.</li>
        </ul>
        При обработке персональных данных в ООО «КОМПЛЕКТСТРОЙ» строго соблюдаются следующие принципы:
        <ul>
          <li>не допускается обработка персональных данных, несовместимая с целями сбора персональных данных;</li>
          <li>
            не допускается обработка персональных данных, которые не отвечают целям обработки. Содержание и состав
            обрабатываемых персональных данных в ООО «КОМПЛЕКТСТРОЙ» соответствует заявленным целям обработки;
          </li>
          <li>
            при обработке персональных данных обеспечивается точность, достаточность, а в необходимых случаях
            актуальность персональных данных;
          </li>
          <li>
            хранение персональных данных осуществляется не дольше, чем этого требуют цели обработки персональных данных,
            а также федеральные законы РФ и договоры, сторонами которых, выгодоприобретателем или поручителем по которым
            является субъект персональных данных;
          </li>
          <li>
            обработка персональных данных осуществляется с соблюдением принципов и правил, предусмотренных
            законодательством РФ.
          </li>
        </ul>
      </div>
      <h2>Цели обработки персональных данных</h2>
      <p>
        Целью обработки персональных данных кандидатов на трудоустройство является подбор и найм персонала в ООО
        «КОМПЛЕКТСТРОЙ».
        <br />
        Целью обработки персональных данных работников, является организация учета персонала ООО «КОМПЛЕКТСТРОЙ» для
        обеспечения соблюдения законов и иных нормативных правовых актов, содействия в трудоустройстве, обучении,
        пользования различного вида льготами в соответствии с Трудовым кодексом РФ, Налоговым кодексом РФ, федеральными
        законами РФ, в частности: Федеральным законом от 1.04.1996 г. № 27-ФЗ «Об индивидуальном (персонифицированном)
        учете в системе обязательного пенсионного страхования», Федеральным законом от 27.07.2006 г. № 152-ФЗ «О
        персональных данных».
        <br />
        Целями обработки персональных данных представителей контрагентов является заключение и исполнение договоров,
        сторонами которых являются контрагент и ООО «КОМПЛЕКТСТРОЙ», а также исполнение требований законодательства РФ.
        <br />
        Целями обработки персональных данных клиентов является исполнение требований законодательства РФ и исполнение
        договоров, проведения маркетинговых и иных исследований и оказания сервисных услуг.
      </p>
      <h2>Конфиденциальность персональных данных и возможность передачи персональных данных третьим лицам</h2>
      <div>
        Доступ к персональным данным ограничивается в соответствии с федеральными законами РФ и локальными правовыми
        актами ООО «КОМПЛЕКТСТРОЙ».
        <br />
        ООО «КОМПЛЕКТСТРОЙ» не разглашает полученные им в результате своей профессиональной деятельности персональные
        данные.
        <br />
        Работники ООО «КОМПЛЕКТСТРОЙ», получившие доступ к персональным данным, принимают обязательства по обеспечению
        конфиденциальности обрабатываемых персональных данных, которые определены:
        <ul>
          <li>трудовым договором;</li>
          <li>инструкциями в части обеспечения безопасности персональных данных.</li>
        </ul>
        Доступ к персональным данным, обрабатываемым в ООО «КОМПЛЕКТСТРОЙ», на основании и во исполнение нормативных
        правовых актов предоставляется органам государственной власти по их письменному запросу (требованию).
      </div>
      <h2>Права и обязанности субъектов персональных данных</h2>
      <p>
        ООО «КОМПЛЕКТСТРОЙ» предпринимает разумные меры для поддержания точности и актуальности имеющихся персональных
        данных, а также удаления персональных данных в случаях, если они являются устаревшими, недостоверными или
        излишними, либо если достигнуты цели их обработки. Субъекты персональных данных несут ответственность за
        предоставление ООО «КОМПЛЕКТСТРОЙ» достоверных сведений, а также за своевременное обновление предоставленных
        данных в случае каких-либо изменений.
        <br />
        В случаях, если Вы как субъект персональных данных хотите узнать, какими персональными данными о Вас располагает
        ООО «КОМПЛЕКТСТРОЙ», либо дополнить, исправить, обезличить или удалить любые неполные, неточные или устаревшие
        персональные данные, либо хотите прекратить обработку ООО «КОМПЛЕКТСТРОЙ» Ваших персональных данных, либо имеете
        другие законные требования, Вы можете в должном порядке и в соответствии с действующим законодательством РФ
        реализовать такое право, обратившись к ООО «КОМПЛЕКТСТРОЙ» по приведенному ниже адресу.
        <br />
        При этом в некоторых случаях (например, если Вы хотите удалить Ваши персональные данные или прекратить их
        обработку) такое обращение также может означать, что ООО «КОМПЛЕКТСТРОЙ» больше не сможет предоставлять Вам
        услуги, для оказания которых необходимым и обязательным условием является получение и обработка ООО
        «КОМПЛЕКТСТРОЙ» Ваших персональных данных. Для выполнения Ваших запросов и/или обращений ООО «КОМПЛЕКТСТРОЙ»
        может потребовать установить Вашу личность и запросить дополнительную информацию, подтверждающую Ваше участие в
        отношениях с ООО «КОМПЛЕКТСТРОЙ», либо сведения, иным образом подтверждающие факт обработки персональных данных
        О «КОМПЛЕКТСТРОЙ». Кроме того, действующее законодательство РФ может устанавливать ограничения и другие условия,
        касающиеся упомянутых выше Ваших прав.
        <br />
        Адрес для направления запросов и/или обращений субъектами персональных данных: 150044, г. Ярославль,
        Ленинградский проспект, 33, в ООО «КОМПЛЕКТСТРОЙ».
      </p>
      <h2>Безопасность персональных данных</h2>
      <p>
        ООО «КОМПЛЕКТСТРОЙ» предпринимает необходимые технические и организационные меры информационной безопасности для
        защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения, путем
        внутренних проверок процессов сбора, хранения и обработки данных и мер безопасности, а также осуществления мер
        по обеспечению физической безопасности данных для предотвращения несанкционированного доступа к системам, в
        которых ООО «КОМПЛЕКТСТРОЙ» хранит персональные данные.
      </p>
    </div>
  );
};

export default Privacy;
