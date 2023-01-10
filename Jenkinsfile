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

                sh 'npx cypress run' // <4>

            }

        }

    }

}
