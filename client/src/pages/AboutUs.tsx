import React, { useContext } from 'react'
import { Card, Typography, Row, Col } from 'antd'
import Layout from '../Layout'
import LanguageContext from '../contexts/LanguageContext'

const { Title, Paragraph } = Typography

const AboutUs = () => {
    const { language, langData, arabicNumerals } = useContext(LanguageContext)

    return (
        <Layout>
            <div id="aboutus-page" style={{ padding: '24px' }}>
                <Card
                    bordered={false}
                    style={{ maxWidth: 800, margin: '0 auto' }}
                >
                    <Title level={2}>
                        {(langData as any).pages.aboutus.title_about[language]}
                    </Title>
                    <Paragraph>
                        {
                            (langData as any).pages.aboutus.paragraph_about[
                                language
                            ]
                        }
                    </Paragraph>
                </Card>

                <Card
                    bordered={false}
                    style={{ maxWidth: 800, margin: '24px auto' }}
                >
                    <Title level={2}>
                        {
                            (langData as any).pages.aboutus.title_mission[
                                language
                            ]
                        }
                    </Title>
                    <Paragraph>
                        {
                            (langData as any).pages.aboutus.paragraph_mission[
                                language
                            ]
                        }
                    </Paragraph>
                </Card>
            </div>
        </Layout>
    )
}

export default AboutUs
