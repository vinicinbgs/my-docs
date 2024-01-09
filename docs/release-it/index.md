---
title: Release It!
---
### 1. Padrões de Resiliência:

**Circuit Breaker:** Implementa a interrupção de circuito para evitar falhas em cascata.  
**Bulkhead:** Isola componentes para evitar que uma falha afete todo o sistema.  
**Timeout e Retry:** Estratégias para lidar com operações lentas ou falhas temporárias.

### 2. Monitoramento Eficaz:

A importância de implementar um sistema de monitoramento robusto para detectar problemas rapidamente.  
A necessidade de métricas relevantes e alertas proativos para antecipar possíveis falhas.

### 3. Desenvolvimento Orientado por Metas:

A abordagem de pensar nas metas do negócio ao desenvolver software.  
Como alinhar o desenvolvimento de software com os objetivos estratégicos da organização.
- [Wikipedia](https://en.wikipedia.org/wiki/Goal-Driven_Software_Development_Process)

### 4. Estudos de Caso e Experiências Práticas:

Lições aprendidas com falhas notáveis em sistemas de grande escala.  
Como as organizações lidaram com incidentes e implementaram melhorias.

### 5. Gerenciamento de Incidentes:

A importância de uma resposta rápida e coordenada a problemas.  
Formação de equipes de resposta a incidentes e implementação de processos eficientes.

### 6. Garantindo a Disponibilidade:

Estratégias para lidar com tráfego inesperado e picos de demanda.  
Atualizações de software sem interrupções e práticas para manter a disponibilidade.

### 7. Resiliência em Arquiteturas Distribuídas:

Como projetar sistemas que são robustos em ambientes distribuídos.  
Considerações para garantir a comunicação eficiente entre componentes distribuídos.


---

Introdução aos Sistemas Antifrágeis:
Nygard introduz a ideia de sistemas antifrágeis, que não apenas resistem a falhas, mas se beneficiam delas para melhorar e evoluir. Ele destaca a importância de não apenas construir sistemas que funcionem, mas também aqueles que podem lidar eficientemente com o inevitável.

Padrões de Resiliência:
O autor explora uma variedade de padrões de resiliência, como Circuit Breaker, Bulkhead, Timeout, e Retry. Cada padrão é detalhadamente explicado, oferecendo insights sobre quando e como aplicá-los para proteger os sistemas contra falhas e garantir a continuidade operacional.

Monitoramento e Detecção de Problemas:
Nygard destaca a importância do monitoramento eficaz e da detecção precoce de problemas. Ele fornece estratégias para implementar sistemas de monitoramento que oferecem visibilidade em tempo real do desempenho do sistema e que alertam proativamente sobre possíveis falhas.

Desenvolvimento Orientado por Metas (Goal-Oriented Development):
O livro defende a abordagem de desenvolvimento orientado por metas, incentivando os desenvolvedores a pensar nas metas e expectativas do negócio ao projetar e implementar sistemas. Isso ajuda a criar sistemas mais alinhados com as necessidades reais da organização.

Estudos de Caso e Experiências Práticas:
Nygard enriquece o livro com uma variedade de estudos de caso e experiências práticas da vida real. Ele compartilha histórias de falhas notáveis em sistemas de grande escala, destacando lições valiosas aprendidas com esses incidentes.

Gerenciamento de Incidentes:
O autor aborda o gerenciamento eficaz de incidentes, discutindo a importância de uma resposta rápida e coordenada a problemas. Ele fornece orientações sobre como formar equipes de resposta a incidentes e implementar processos eficientes para lidar com crises.

Garantindo a Disponibilidade:
Nygard explora estratégias para garantir a disponibilidade contínua de sistemas, incluindo técnicas para lidar com tráfego inesperado, atualizações de software sem interrupções e o uso eficaz de arquiteturas distribuídas.



-------
#### Defining stability (pg 24-25)
The terms impulse and stress come from mechanical engineering. An impulse is a rapid shock to the system. An impulse to the system is when something whacks it with a hammer.
In contrast, stress to the system is a force applied to the system over an extended period.

Examples:
A flash mob pounding the PS6 product detail page, thanks to a rumor that such a thing exists, cause an impulse. Ten thousand new sessions, all arriving within one minute of each other, is very difficult for any service instance to withstand.
A celebrity tweet about your site is an impulse. Dumping twelve million messages into a queue at midnight on November 21 is an impulse. These thing can facture the system in the blink of an eye.

On the other hand, getting slow response from your credit card processor because it doesn't have enough capacity for all of its customers is a stress to the system. In a mechanical system, a material changes shape when stress is applied.
This change in shape is called the `strain`. Stress produces strain. The same thing happens with computer systems. The stress from the credit card processor will cause strain to propagate to other parts of the system, which can produce odd effects.
It could manifest as higher RAM usage on the web servers or excess I/O rates on the database server or as some other far distant effect.

So how do you find these kinds of bugs? The only way you can catch them before they bite you in production is to run your own longevity tests. If you can, set aside a developer machine. Have it run JMeter, Marathon, or some other load-testing tool.
Don't hit the system hard; just keep driving requests all the time. (Also, be sure to have the scripts slack for a few hours a day to simulate the slow period during the middle of the night. That will catch connection pool and firewall timeouts.)

#### Chain of Failure (pg 29)

Underneath  every  system  outage  is  a  chain  of  events  like  this.  One  small
issue leads to another, which leads to another. Looking at the entire chain
of failure after the fact, the failure seems inevitable.

Fault: A condition that creates an incorrect internal state in your software.
A fault may be due to a latent bug that gets triggered, or it may be due
to an unchecked condition at a boundary or external interface.

Error: Visibly incorrect behavior. When your trading system suddenly buys
ten billion dollars of Pokemon futures, that is an error.

Failure: An unresponsive system. When a system doesn’t respond, we say it
has failed. Failure is in the eye of the beholder...a computer may have
the power on but not respond to any requests.

One way to prepare for every possible failure is to look at every external call,
every I/O, every use of resources, and every expected outcome and ask, “What
are all the ways this can go wrong?” Think about the different types of impulse
and stress that can be applied:
• What if it can’t make the initial connection?
• What if it takes ten minutes to make the connection?
• What if it can make the connection and then gets disconnected?
• What if it can make the connection but doesn’t get a response from the
other end?
• What if it takes two minutes to respond to my query?
• What if 10,000 requests come in at the same time?
• What if the disk is full when the application tries to log the error message
about the SQLException that happened because the network was bogged
down with a worm?

:::tip
Every architecture diagram ever drawn has boxes and arrows, similar to the
ones in the following figure. (A new architect will focus on the boxes; an
experienced one is more interested in the arrows.)
:::

#### Transmission Control Protocol (TCP)
- “three-way handshake” to establish a connection

The connection starts when the caller (the client in this scenario, even though
it is itself a server for other applications) sends a SYN packet to a port on the

remote server. If nobody is listening to that port, the remote server immedi-
ately sends back a TCP “reset” packet to indicate that nobody’s home. The

calling application then gets an exception or a bad return value. All this happens very quickly, in less than ten milliseconds if both machines are
plugged into the same switch.

If the remote server is listening on that port, it sends back a SYN-ACK packet to acknowledge the connection. The caller then sends an ACK packet to acknowledge the acknowledgment. The connection is now established, and the two applications can start sending data back and forth.

Suppose, though, that the remote application is listening to the port but is
absolutely hammered with connection requests, until it can no longer service
the incoming connections. The port itself has a “listen queue” that defines
how many pending connections (SYN sent, but no SYN/ACK replied) are
allowed by the network stack. Once that listen queue is full, further connection
attempts are refused quickly. The listen queue is the worst place to be. While
the socket is in that partially formed state, whichever thread called open() is
blocked inside the OS kernel until the remote application finally gets around

to accepting the connection or until the connection attempt times out. Con-
nection timeouts vary from one operating system to another, but they’re

usually measured in minutes! The calling application’s thread could be blocked
waiting for the remote server to respond for ten minutes!

Network failures can hit you in two ways: fast or slow. Fast network failures
cause immediate exceptions in the calling code. “Connection refused” is a very
fast failure; it takes a few milliseconds to come back to the caller. Slow failures,
such as a dropped ACK, let threads block for minutes before throwing exceptions.
The blocked thread can’t process other transactions, so overall capacity is
reduced. If all threads end up getting blocked, then for all practical purposes,
the server is down. Clearly, a slow response is a lot worse than no response.

:::tip
A socket is an endpoint of a bidirectional communication between two programs running on the network. A socket is bound to a port number so that the TCP layer can identify the application that data is destined to be sent to. An endpoint is a combination of an IP address and a port number. Every TCP connection can be uniquely identified by its two endpoints. That way you can have multiple connections between your host and the server.
:::

Ways that such an integration point can harm the caller:
• The provider may accept the TCP connection but never respond to the
HTTP request.
• The provider may accept the connection but not read the request. If the
request body is large, it might fill up the provider’s TCP window. That
causes the caller’s TCP buffers to fill, which will cause the socket write
to block. In this case, even sending the request will never finish.
• The provider may send back a response status the caller doesn’t know
how to handle. Like “418 I’m a teapot.” Or more likely, “451 Resource
censored.”
• The provider may send back a response with a content type the caller
doesn’t expect or know how to handle, such as a generic web server 404
page in HTML instead of a JSON response. (In an especially pernicious
example, your ISP may inject an HTML page when your DNS lookup fails.)
• The provider may claim to be sending JSON but actually sending plain
text. Or kernel binaries. Or Weird Al Yankovic MP3s.

---

### Countering Integration Point Problems (pg 45)

#### What can you do to make integration points safer? 
The most effective stability patterns to combat integration point failures are Circuit Breaker and Decoupling Middleware.

Testing helps, too. Cynical software should handle violations of form and function, such as badly formed headers or abruptly closed connections. To make sure your software is cynical enough, you should make a test harness —a simulator that provides controllable behavior—for each integration test.

##### Beware this necessary evil.
Every integration point will eventually fail in some way, and you need to
be prepared for that failure.

##### Prepare for the many forms of failure.
Integration point failures take several forms, ranging from various network
errors to semantic errors. You will not get nice error responses delivered
through the defined protocol; instead, you’ll see some kind of protocol
violation, slow response, or outright hang.

##### Know when to open up abstractions.
Debugging integration point failures usually requires peeling back a layer
of abstraction. Failures are often difficult to debug at the application layer
because most of them violate the high-level protocols. Packet sniffers and
other network diagnostics can help.

##### Failures propagate quickly.
Failure in a remote system quickly becomes your problem, usually as a
cascading failure when your code isn’t defensive enough.

##### Apply patterns to avert integration point problems.
Defensive programming via Circuit Breaker, Timeouts (see Timeouts, on
page 91), Decoupling Middleware, and Handshaking (see Handshaking,
on page 111) will all help you avoid the dangers of integration points.

The dominant architectural style today is the horizontally scaled farm of
commodity hardware. Horizontal scaling means we add capacity by adding
more servers. We sometimes call these “farms.” The alternative, vertical scaling,
means building bigger and bigger servers—adding core, memory, and storage
to hosts. Vertical scaling has its place, but most of our interactive workload
goes to horizontally scaled farms.

If your system scales horizontally, then you will have load-balanced farms or
clusters where each server runs the same applications. The multiplicity of
machines provides you with fault tolerance through redundancy. A single
machine or process can completely bonk while the remainder continues
serving transactions.

---

### Chain Reactions (pg 46)

##### Recognize that one server down jeopardizes the rest.
A chain reaction happens because the death of one server makes the
others pick up the slack. The increased load makes them more likely to
fail. A chain reaction will quickly bring an entire layer down. Other layers

that depend on it must protect themselves, or they will go down in a cas-
cading failure.

##### Hunt for resource leaks.
Most of the time, a chain reaction happens when your application has a
memory leak. As one server runs out of memory and goes down, the other
servers pick up the dead one’s burden. The increased traffic means they
leak memory faster.

##### Hunt for obscure timing bugs.
Obscure race conditions can also be triggered by traffic. Again, if one
server goes down to a deadlock, the increased load on the others makes
them more likely to hit the deadlock too.

##### Use Autoscaling.
In the cloud, you should create health checks for every autoscaling group.
The scaler will shut down instances that fail their health checks and start
new ones. As long as the scaler can react faster than the chain reaction
propagates, your service will be available.

##### Defend with Bulkheads.
Partitioning servers with Bulkheads can prevent chain
reactions from taking out the entire service—though they won’t help the
callers of whichever partition does go down. Use Circuit Breaker on the
calling side for that.

---

### Cascading Failures (pg 49)
Just as integration points are the number-one source of cracks, cascading
failures are the number-one crack accelerator. Preventing cascading failures
is the very key to resilience. The most effective patterns to combat cascading failures are Circuit Breaker and Timeouts.

##### Stop cracks from jumping the gap.
A cascading failure occurs when cracks jump from one system or layer
to another, usually because of insufficiently paranoid integration points.
A cascading failure can also happen after a chain reaction in a lower layer.
Your system surely calls out to other enterprise systems; make sure you
can stay up when they go down.

##### Scrutinize resource pools.
A cascading failure often results from a resource pool, such as a connec-
tion pool, that gets exhausted when none of its calls return. The threads

that get the connections block forever; all other threads get blocked
waiting for connections. Safe resource pools always limit the time a thread
can wait to check out a resource.

##### Defend with Timeouts and Circuit Breaker.
A cascading failure happens after something else has already gone wrong.
Circuit Breaker protects your system by avoiding calls out to the troubled
integration point. Using Timeouts ensures that you can come back from
a call out to the troubled point.

---

### Heap Memory (pg 52)

One such hard limit is memory available, particularly in interpreted or managed code languages. Excess traffic can stress the memory system in several ways. Assume you use memory-based sessions, the session stays resident in memory for a certain length of time after the last request from that user.

During that dead time, the session still occupies valuable memory. Every object you put into the session sits there in memory, tying up precious bytes that could be serving some other user.

##### Off-Heap Memory, Off-Host Memory

Another effective way to deal with per-user memory is to farm it out to a dif-
ferent process. Instead of keeping it inside the heap—that is, inside the address
space of your server’s process—move it out to some other process. Memcached
is a great tool for this.3 It’s essentially an in-memory key-value store that you
can put on a different machine or spread across several machines.

Redis is another popular tool for moving memory out of your process.4 It’s a
fast “data structure server” that lives in a space between cache and database.
Many systems use Redis to hold session data instead of keeping it in memory
or in a relational database.

Any  of  these  approaches  exercise  a  trade-off  between  total  addressable
memory  size  and  latency  to  access  it.  This  notion  of  memory  hierarchy  is
ranked  by  size  and  distance.  Registers  are  fastest  and  closest  to  the  CPU,
followed by cache, local memory, disk, tape, and so on. On one hand, networks
have gotten fast enough that “someone else’s memory” can be faster to access
than local disk. Your application is better off making a remote call to get a
value than reading it from storage. On the other hand, local memory is still
faster than remote memory. There’s no one-size-fits-all answer.

