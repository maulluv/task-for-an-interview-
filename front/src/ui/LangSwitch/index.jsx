import { useTranslation } from 'react-i18next'

export const LangSwitch = () => {
    const { i18n } = useTranslation()
    const isEn = i18n.language === 'en'

    const changeLang = () => {
        const next = isEn ? 'uk' : 'en'
        i18n.changeLanguage(next)
        localStorage.setItem('lang', next)
    }

    return (
        <button className="btn btn-ghost" onClick={changeLang}>
            {isEn ? 'EN' : 'UA'}
        </button>
    )
}