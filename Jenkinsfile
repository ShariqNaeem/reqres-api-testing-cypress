pipeline {

    agent any

    stages{

        stage ('build'){

            steps{

                checkout scm

                sh 'npm install' // <1>

            }   

        }

        stage('chrome'){

            steps{

                sh 'npx cypress run --browser chrome' // <4>

            }

        }
        
        stage('firefox'){

            steps{

                sh 'npx cypress run --browser firefox' // <4>

            }

        }
        
        stage('electron'){

            steps{

                sh 'npx cypress run --browser electron' // <4>

            }

        }

    }

}
