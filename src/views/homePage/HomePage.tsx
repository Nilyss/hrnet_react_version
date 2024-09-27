// styles
import './homePage.scss'

// images | assets
import backgroundImage1920 from '../../assets/images/homeBgnd-1920.webp'
import backgroundImage1600 from '../../assets/images/homeBgnd-1600.webp'
import backgroundImage1200 from '../../assets/images/homeBgnd-1200.webp'
import backgroundImage768 from '../../assets/images/homeBgnd-768.webp'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useTranslation } from 'react-i18next'

export default function HomePage(): ReactElement {
  const { t } = useTranslation()
  return (
    <main id={'homePage'}>
      <figure>
        <img
          src={backgroundImage1920}
          srcSet={`
            ${backgroundImage768} 768w, 
            ${backgroundImage1200} 1200w, 
            ${backgroundImage1600} 1600w, 
            ${backgroundImage1920} 1920w,
          `}
          sizes="(max-width: 768px) 768px,
            (max-width: 1200px) 1200px,
            (max-width: 1600px) 1600px,
            1920px"
          alt="Background Image"
        />
      </figure>
      <section className={'homePageContent'}>
        <h2>
          {t('welcomeTo')} <span className={'brandColor'}>HR</span>net !
        </h2>
        <p>
          <span className={'brandColor'}>HR</span>net {t('allowsYouTo')}{' '}
          <strong>{t('onePlace')}</strong>.
        </p>
        <p>
          {t('viewAll')} <strong>{t('essentialInformation')}</strong> {''}
          {t('andAddNewTeamMembers')}.
        </p>
        <p>
          {t('streamlineYourHumanResourceManagement')}{' '}
          <strong>{t('simplicityAndEfficiency')}</strong>.
        </p>
      </section>
    </main>
  )
}
